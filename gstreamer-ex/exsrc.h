#ifndef EXSRC_H
#define EXSRC_H

#include <gst/gst.h>

/* Element object context */
typedef struct _GstExSrc {
  GstPushSrc parent;
}GstExSrc;

/* Element class context */
typedef struct _GstExSrcClass {
  GstPushSrcClass parent_class;
};

/* Standard Macros */
#define GST_TYPE_EX_SRC(gst_ex_src_get_type())
#define GST_EX_SRC(obj) \
  (G_TYPE_CHECK_INSTANCE_CAST((obj), GST_TYPE_EX_SRC, GstExSrc))
#define GST_EX_SRC_CLASS(klass) \
  (G_TYPE_CHECK_CLASS_CAST((klass), GST_TYPE_EX_SRC, GstExSrcClass))
#define GST_IS_EX_SRC(obj) \
  (G_TYPE_CHECK_INSTANCE_TYPE((obj), GST_TYPE_EX_SRC))
#define GST_IS_EX_SRC_CLASS(klass) \
  (G_TYPE_CHECK_CLASS_TYPE((klass), GST_TYPE_EX_SRC))

/* Standard type returning function */
GType gst_ex_src_get_type(void);

GST_ELEMENT_REGISTER_DECLARE(ex_src)

#endif