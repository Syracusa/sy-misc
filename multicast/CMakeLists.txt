cmake_minimum_required(VERSION 3.16)

project(mctest)

set(CMAKE_BUILD_TYPE Debug)

add_compile_options(-fsanitize=address)
add_link_options(-fsanitize=address)

add_executable(mctest mc.c)