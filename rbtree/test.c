#include <stdio.h>
#include <time.h> /* time */
#include <stdlib.h> /* srand, rand */
#include <string.h>

#include "rbtree.h"


static void inject_random(RbtCtx* ctx, RbtKey maxval)
{
    RbtKey key = rand() % maxval;
    fprintf(stderr, "Insert key %lu\n", key);
    rbt_insert(ctx, key, NULL);
}

int main(){
    srand(time(NULL));
    
    RbtCtx* ctx = rbt_new();
    for (int i = 0; i < 10; i++) {
        inject_random(ctx, 1000);
        rbt_print(ctx, 120);
    }

    rbt_print(ctx, 120);
    rbt_finalize(ctx);

    return 0;
}
