<?php

if($_SERVER['REQUEST_URI'] != "/"){
    header("Location: /");
    die() ;
}

require $_SERVER['DOCUMENT_ROOT'] . "/Views/home.html" ;
