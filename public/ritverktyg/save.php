<?php
  include "db.php";
  $item = json_decode($_POST["json"]);
  saveItem($item);
?>