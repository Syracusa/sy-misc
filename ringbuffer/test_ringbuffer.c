/* RingBuffer test */
#include <unistd.h>
#include <time.h>
#include <stdlib.h>

#include "ringbuffer.h"

int main()
{
    RingBuffer* ringbuf = RingBuffer_new(100000);

    uint8_t bseq = 0;
    uint8_t rseq = 0;

    srand(time(NULL));

    for (int tseq = 0; tseq < 300000; tseq++) {
        for (int i = 0; i < 10; i++) {
            int rndmsg_len = rand() % 4000 + 1;
            uint8_t *rndmsg = malloc(rndmsg_len);

            uint8_t priv_bseq = bseq;
            for (int j = 0; j < rndmsg_len; j++){
                rndmsg[j] = bseq++;
            }

            ssize_t pres = RingBuffer_push(ringbuf, rndmsg, rndmsg_len);
            if (pres < 0){
                if (pres == PIUTIL_BUFFER_FULL){
                    // fprintf(stderr, "buffer full!\n");
                } else {
                    fprintf(stderr, "unexpected error %ld\n", pres);
                }
                bseq = priv_bseq;
            }

            free(rndmsg);
        }

        for (int i = 0; i < 10; i++) {
            int read_max = 1 + rand() % 4000; /* Arbitary num */
            uint8_t *readbuf = malloc(read_max);
            
            ssize_t rres = RingBuffer_pop(ringbuf, readbuf, read_max);
            if (rres < 0) {
                if (rres == PIUTIL_BUFFER_DATA_NOT_ENOUGH) {
                    // fprintf(stderr, "Not enough data!\n");
                } else {
                    fprintf(stderr, "Unexpected error %ld\n", rres);
                }
            } else {
                /* Read success */
                for (int j = 0; j < read_max; j++){
                    if (readbuf[j] != rseq++){
                        fprintf(stderr, "Data error! Read %x Expected %x\n", readbuf[j], (uint8_t)(rseq - 1));
                        exit(2);
                    } else {
                        // fprintf(stderr, "Data sane.. Read %u Expected %u\n", readbuf[j], (uint8_t)(rseq - 1));
                    }
                }
            }

            free(readbuf);
        }
    }

    RingBuffer_destroy(ringbuf);

    return 0;
}


