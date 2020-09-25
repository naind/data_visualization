install.packages("V8")

library(httr)
library(rvest)
library(dplyr)
library(stringr)
library(rjson)
library(jsonlite)
library(V8)

data <- fromJSON('data_full.json')
