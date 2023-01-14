#define _DEFAULT_SOURCE /* struct ip_mreq */

#include <stdio.h>
#include <stdlib.h>
#include <errno.h>  /* errno */
#include <string.h> /* strerror() */

#include <sys/socket.h>
#include <arpa/inet.h>
#include <netinet/in.h> /* struct ip_mreq */

#include <pthread.h>

#include <unistd.h> /* sleep() */

#define MULTICAST_IP "224.1.1.15"
#define MULTICAST_PORT 44001
int sock;

#define SOCK_BUF_SIZE 2000
void *recv_routine(void *arg)
{
    unsigned char buf[SOCK_BUF_SIZE];
    struct sockaddr_in sender_addr;
    socklen_t socklen = sizeof(struct sockaddr_in);

    while (1)
    {
        int rlen = recvfrom(sock, buf, SOCK_BUF_SIZE,
                            0, (struct sockaddr *)&sender_addr, &socklen);
        if (rlen > 0)
        {
            fprintf(stderr, "Recv from socket. len : %d, from %s:%u\n", rlen, 
                    inet_ntoa(sender_addr.sin_addr), 
                    ntohs(sender_addr.sin_port));
        }
    }
}

void sendloop()
{
    unsigned char buf[SOCK_BUF_SIZE];
    const char *dat = "Hello peers!\n";
    memcpy(buf, dat, strlen(dat));

    struct sockaddr_in receiver_addr;

    receiver_addr.sin_family = AF_INET;
    receiver_addr.sin_port = htons(MULTICAST_PORT);
    receiver_addr.sin_addr.s_addr = inet_addr(MULTICAST_IP);

    while (1)
    {
        int slen = sendto(sock, buf, strlen(dat), 0,
                          (struct sockaddr *)&receiver_addr,
                          sizeof(receiver_addr));
        sleep(1);
    }
}

int main()
{
    /* Open socket */
    sock = socket(AF_INET, SOCK_DGRAM, 0);

    { /* Set SO_REUSEADDR option */
        int opt_reuse = 1;
        int res = setsockopt(sock, SOL_SOCKET, SO_REUSEADDR,
                             (char *)&opt_reuse, sizeof(opt_reuse));
        if (res < 0)
        {
            fprintf(stderr, "Socket Option SO_REUSEADDR fail with %d(%s)\n",
                    res, strerror(errno));
            exit(2);
        }
    }

    { /* Bind address to socket*/
        struct sockaddr_in sockadr;
        memset(&sockadr, 0, sizeof(sockadr));

        sockadr.sin_family = AF_INET;
        sockadr.sin_port = htons(MULTICAST_PORT);
        sockadr.sin_addr.s_addr = INADDR_ANY;

        int res = bind(sock, (struct sockaddr *)&sockadr, sizeof(sockadr));
        if (res < 0)
        {
            fprintf(stderr, "Bind fail with %d(%s)\n",
                    res, strerror(errno));
            exit(2);
        }
    }

    { /* Join multicast */
        struct ip_mreq mulreq;
        mulreq.imr_multiaddr.s_addr = inet_addr("224.1.1.15");
        mulreq.imr_interface.s_addr = INADDR_ANY;
        int res = setsockopt(sock, IPPROTO_IP, IP_ADD_MEMBERSHIP,
                             (char *)&mulreq, sizeof(mulreq));
        if (res < 0)
        {
            fprintf(stderr, "IP_ADD_MEMBERSHIP fail with %d(%s)\n",
                    res, strerror(errno));
            exit(2);
        }
    }

    { /* Recv multicast packet */
        pthread_t t;

        int res = pthread_create(&t, NULL, recv_routine, NULL /*arg*/);
        if (res < 0)
        {
            fprintf(stderr, "pthread_create fail!\n");
            exit(2);
        }
    }

    /* Send multicast packet */
    sendloop();

    return 0;
}