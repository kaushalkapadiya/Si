<?php

$db = mysqli_connect("localhost","root","","response") or die($db);

$email = 120;
echo $email;


$name=mysqli_real_escape_string($db, $_POST['name']);
echo $name;

//$email=mysqli_real_escape_string($db, $_POST['email']);

$comments=mysqli_real_escape_string($db, $_POST['comments']);
echo $comments;

// Create connection

$sql = "INSERT INTO response(name, email, comments) VALUES('$name','$email','$comments')";
  mysqli_query($db,$sql);
?>
