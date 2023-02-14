#ifndef RBTREE_H
#define RBTREE_H


#include <stdint.h>


typedef uint64_t RbtKey;

typedef struct RbtElem
{
    struct RbtElem *parent;
    struct RbtElem *child[2];

    RbtKey key;
    void *data;

    uint8_t color; /* 0: red, 1: black */
} RbtElem;

typedef struct RbtCtx
{
    RbtElem *root;
    int depth; /* Black height of tree*/
} RbtCtx;

void rbt_print(RbtCtx *ctx, int col);
void rbt_insert(RbtCtx *ctx, RbtKey key, void *data);
void rbt_delete(RbtCtx *ctx, RbtKey key);
RbtElem *rbt_get(RbtCtx *ctx, RbtKey key);

RbtCtx *rbt_new();
void rbt_finalize();

#endif