#include <stdio.h>
#include <stdlib.h>
#include <string.h> /* memset */

#include "rbtree.h"

char **iovec;

#define ALLOC_IOVEC do {\
iovec = malloc(sizeof(char *) * (ctx->depth + 1));\
for (int i = 0; i < ctx->depth + 1; i++) {\
    iovec[i] = malloc(sizeof(char) * (col + 2));\
    memset(iovec[i], '.', sizeof(char) * (col + 2));\
    iovec[i][col + 1] = '\0';\
    iovec[i][col] = '\n';\
}\
} while (0);

#define FREE_IOVEC do {\
for (int i = 0; i < ctx->depth + 1; i++)\
    free(iovec[i]);\
free(iovec);\
} while(0);

static void iovec_tree_print(char **iovec, RbtElem *elem, int depth, int startpos, int endpos)
{
    int centerpos = (startpos + endpos) / 2;
    if (elem == NULL) {
        iovec[depth][centerpos] = '*';
        return;
    }
    char tmp[100];
    sprintf(tmp, "%s%lu", elem->color == 0 ? "R-" : "B-", elem->key);

    int prtpos = centerpos;

    int availlen = endpos - startpos + 1;
    if (availlen < strlen(tmp)) {
        memset(&iovec[depth][startpos], '!', availlen);
        return;
    }

    if (endpos - centerpos + 1 < strlen(tmp)) {
        prtpos = startpos;
    }

    memcpy(&iovec[depth][prtpos], tmp, strlen(tmp));

    iovec_tree_print(iovec, elem->child[0], depth + 1, startpos, centerpos - 1);
    iovec_tree_print(iovec, elem->child[1], depth + 1, centerpos, endpos);
}

void rbt_print(RbtCtx *ctx, int col)
{
    ALLOC_IOVEC;

    fprintf(stderr, "Print Depth : %d\n", ctx->depth);
    iovec_tree_print(iovec, ctx->root, 0, 0, col - 1);

    for (int i = 0; i < ctx->depth + 1; i++) {
        printf("%s", iovec[i]);
    }

    fprintf(stderr, "Print done\n");
    FREE_IOVEC;
}

static void rbt_balancing(RbtCtx *ctx, RbtElem *node)
{
    RbtElem *parent = node->parent;
    if (parent == NULL)
        return; /* Root Node */

    fprintf(stderr, "Parent color : %u\n", node->color);

    if (parent->color == 0) {
        /* Parent is Red */

        RbtElem *grandparent = node->parent->parent;
        if (grandparent) {
            RbtElem *uncle;
            if (grandparent->child[0] == parent)
                uncle = grandparent->child[1];
            else
                uncle = grandparent->child[0];

            if (uncle) {
                if (uncle->color == 0) {
                    /* Uncle is Red */
                    uncle->color = 1;
                    parent->color = 1;
                    grandparent->color = 0;
                    rbt_balancing(ctx, grandparent);
                    return;
                }
            }

            /* Uncle is Black or not exist */

            int dir = (parent->child[0] == node) ? 0 : 1;
            int parent_dir = (grandparent->child[0] == parent) ? 0: 1;
            int is_outer_node = (dir != parent_dir) ? 0 : 1;

            if (!is_outer_node) {
                /* Make node to outter position */
                
                /*
                    if node is left
                    parent -> node's left child
                    node -> grandparent's left child
                    
                */
            }

            /* Node is in outter position */
            /* TBD */
            return;
        } else {
            /* No grandparent exist.. */
            parent->color = 1;
            return;
        }

    } else {
        /* Parent is black. No need to process */

        return;
    }
}

static void __rbt_insert(RbtCtx *ctx,
                         RbtElem **partial_tree,
                         RbtElem *node,
                         int depth)
{
    depth++;

    if (*partial_tree == NULL) {
        *partial_tree = node;
        rbt_balancing(ctx, node);

        if (ctx->depth < depth) {
            ctx->depth = depth;
            fprintf(stderr, "Depth is now %d\n", depth);
        }
        return;
    }

    if ((*partial_tree)->key == node->key) {
        fprintf(stderr, "Key collision occured. key:%lu\n", node->key);
        free(node);
        return;
    } else if ((**partial_tree).key > node->key) {
        node->parent = (RbtElem *)(*partial_tree);
        __rbt_insert(ctx, (RbtElem **)&((*partial_tree)->child[0]), node, depth);
    } else {
        node->parent = (RbtElem *)(*partial_tree);
        __rbt_insert(ctx, (RbtElem **)&((*partial_tree)->child[1]), node, depth);
    }
}

void rbt_insert(RbtCtx *ctx, RbtKey key, void *data)
{
    RbtElem *elem = malloc(sizeof(RbtElem));
    memset(elem, 0x00, sizeof(RbtElem));

    elem->key = key;
    elem->data = data;

    __rbt_insert(ctx, &ctx->root, elem, 0);
}

void rbt_delete(RbtCtx *ctx, RbtKey key)
{
    /* TODO */
}

void *rbt_get(RbtCtx *ctx, RbtKey key)
{
    /* TODO */
    return NULL;
}

RbtCtx *rbt_new()
{
    RbtCtx *newctx = malloc(sizeof(RbtCtx));
    memset(newctx, 0x00, sizeof(RbtCtx));
    return newctx;
}

static void free_elem(RbtElem *elem)
{
    if (elem->child[0] != NULL)
        free_elem(elem->child[0]);

    if (elem->child[1] != NULL)
        free_elem(elem->child[1]);

    free(elem);
}

static void finalize_tree(RbtCtx *ctx)
{
    free_elem(ctx->root);
}

void rbt_finalize(RbtCtx *ctx)
{
    finalize_tree(ctx);
    free(ctx);
}