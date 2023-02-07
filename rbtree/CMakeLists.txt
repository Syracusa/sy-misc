cmake_minimum_required(VERSION 3.10.2)
project(rbtree 
        VERSION 1.0
        DESCRIPTION "Red-Black Tree Implementation"
        LANGUAGES C)

set(CMAKE_BUILD_TYPE Debug)
set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -fsanitize=address")

add_executable(rbt "rbtree.c" "test.c")