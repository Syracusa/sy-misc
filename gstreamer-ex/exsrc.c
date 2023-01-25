#include "exsrc.h"

/* https://github.com/GNOME/glib/blob/main/gobject/gtype.h */
G_DEFINE_TYPE(GstExSrc, gst_ex_src, GST_TYPE_ELEMENT);
GST_ELEMENT_REGISTER_DEFINE(ex_src, "ex-src", GST_RANK_NONE, GST_TYPE_MY_FILTER);
