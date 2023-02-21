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
    if (endpos < startpos)
        return;

    int centerpos = (startpos + endpos) / 2;
    if (elem == NULL) {
        iovec[depth][centerpos] = '*';
        return;
    }
    char tmp[100];
    sprintf(tmp, "%s%lu", elem->color == 0 ? "R-" : "B-", elem->key);

    int prtpos = centerpos;

    int availlen = endpos - startpos + 1;
    if (availlen < strlen(tmp) + 1) {
        memset(&iovec[depth][startpos], '!', 1);
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

    fprintf(stderr, "Try balancing... Parent color : %u\n", node->color);

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
                    fprintf(stderr, "Make Parent and Uncle to Black\n");
                    rbt_balancing(ctx, grandparent);
                    return;
                }
            }

            /* Uncle is Black or not exist */
            int dir = (parent->child[0] == node) ? 0 : 1;
            int parent_dir = (grandparent->child[0] == parent) ? 0 : 1;
            int is_outer_node = (dir != parent_dir) ? 0 : 1;

            if (!is_outer_node) {
                /* Make parent node to outter position and be parent of parent */
                RbtElem *inner_son = node->child[1 - dir];

                parent->parent = node;
                node->child[1 - dir] = parent;

                if (inner_son) {
                    inner_son->parent = parent;
                    parent->child[dir] = inner_son;
                } else {
                    parent->child[dir] = NULL;
                }

                node->parent = grandparent;
                grandparent->child[1 - dir] = node;
                printf("Inner to Outer Done\n");
                rbt_balancing(ctx, parent);
                return;
            }

            /* Node is in outter position */
            RbtElem *sibling = parent->child[1 - dir];
            RbtElem *superparent = grandparent->parent;

            parent->child[1 - dir] = grandparent;
            grandparent->parent = parent;

            if (sibling) {
                grandparent->child[dir] = sibling;
                sibling->parent = grandparent;
            } else {
                grandparent->child[dir] = NULL;
            }

            if (superparent) {
                int spdir = (grandparent == superparent->child[0]) ? 0 : 1;
                superparent->child[spdir] = parent;
                parent->parent = superparent;
            } else {
                parent->parent = NULL;
                ctx->root = parent;
            }

            grandparent->color = 0;
            parent->color = 1;
            printf("Outer balancing done\n");
            return;
        } else {
            /* No grandparent exist.. */
            parent->color = 1;
            fprintf(stderr, "No grandparent... Make parent to black\n");
            return;
        }
    } else {
        /* Parent is black. No need to process */
        fprintf(stderr, "Parent is black. No need to process\n");
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
        if (ctx->depth < depth) {
            ctx->depth = depth;
            fprintf(stderr, "Depth is now %d\n", depth);
        }
        *partial_tree = node;
        rbt_balancing(ctx, node);

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
    RbtElem *elem = rbt_get(ctx, key);

    if (elem == NULL)
        return;

    if (elem == ctx->root){
        if (elem->child[0] != NULL){
            if (elem->child[1] != NULL){
                /* elem is root and has two child */

                /* Find Successor */
                RbtElem* succ = elem->child[1];
                while (succ->child[0] != NULL)
                    succ = succ->child;


                if (succ->child[1]) {
                    succ->child[1]->parent = succ->parent;
                    succ->parent->child[0] = succ->child[1];
                }

                succ->child[0] = elem->child[0];
                succ->child[1] = elem->child[1];
                succ->parent = NULL;
                ctx->root = succ;

                free(elem);

                /* TODO : Make successor as root node */
            } else {
                /* elem is root and has only left child */
                ctx->root = elem->child[0];
                elem->child[0]->parent = NULL;

                free(elem);
            }  
        } else {
            if (elem->child[1] != NULL) {
                /* elem is root and has only right child */
                ctx->root = elem->child[1];
                elem->child[1]->parent = NULL;

                free(elem); 
            } else {
                /* elem is root and has no child */
                ctx->root = NULL;
                free(elem);
            }
        }
    } else {
        /* Elem is not root */

    }

    if (elem->color == 0){
        /* Red node */
    } else {
        /* Black node */
    }

    /* TODO */


}

static RbtElem *__rbt_get(RbtElem *elem, RbtKey key)
{
    if (elem == NULL)
        return NULL;

    if (elem->key == key){
        return elem;
    } else if (elem->key > key){
        return __rbt_get(elem->child[0], key);
    } else {
        return __rbt_get(elem->child[1], key);
    }
}

RbtElem *rbt_get(RbtCtx *ctx, RbtKey key)
{
    return __rbt_get(ctx->root, key);
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