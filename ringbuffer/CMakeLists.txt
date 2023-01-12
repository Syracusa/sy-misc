cmake_minimum_required(VERSION 3.16)

project(ringbuffer)

set(CMAKE_BUILD_TYPE Debug)

add_compile_options(-fsanitize=address)
add_link_options(-fsanitize=address)

# include_directories(include)

add_executable(test ringbuffer.c test_ringbuffer.c)