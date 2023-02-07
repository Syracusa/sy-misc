#ifndef RBTREE_H
#define RBTREE_H

typedef struct RbtElem {
    void* parent;
    void* child[2];
    
    int key;
    void *data;
} RbtElem;

typedef struct RbtCtx {
    RbtElem* root;
    int depth; /* Black height of tree*/
} RbtCtx;

void rbt_print(RbtCtx *ctx, int col);
void rbt_insert(RbtCtx *ctx, int key, void *data);
void rbt_delete(RbtCtx *ctx, int key);
void *rbt_get(RbtCtx *ctx, int key);

RbtCtx* rbt_new();
void rbt_finalize();

#endif