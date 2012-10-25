<?php
  $mongo = new Mongo();
  $db = $mongo->selectDB("bokhylla");
  $collection = $db->items;
  
  function saveItem($item){
    print_r($item);
    global $collection;
    $collection->insert(array("name"=>"order","order"=>$item));
  }
  function getItems(){
    global $collection;
    $cursor = $collection->find();
    $result = array();
    foreach ($cursor as $obj) {
      array_push($result,$obj);
    }
    return $result;
  }
?>