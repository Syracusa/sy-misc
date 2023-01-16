set(OBJ_FILE libwebsockets.a)

find_library(
	LIBWEBSOCKETS
	NAMES ${OBJ_FILE}
	PATHS ${CMAKE_SOURCE_DIR}/lib
	REQUIRED
)
