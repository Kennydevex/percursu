<?php
namespace Percursu\Helpers;

use Category;
use Entity;
use Image;
use Folk;

class Common
{

  //Categorias
  public static function verifyCategory($categoryName, $entityName)
  {
    $category = Category::whereName($categoryName)->first();
    if (!$category) {
      $entity = self::findOrCreateEntity($entityName);
      $category = Category::create([
        'name' => $categoryName,
        'description' => "Categoria para a tabela " . $entityName,
        'entity_id' => $entity->id
      ]);
    }
    return $category;
  }


  //Entidades
  public static function findOrCreateEntity($entityName)
  {
    $entity = Entity::whereName($entityName)->first();
    if (!$entity) {
     $entity = Entity::create(['name' => $entityName,'status'=> true]);
    }
    return $entity;
  }

  // public static function storeImage($imageName, $article, $description)
  // {
  //   $image = new ImageFile();
  //   $image->name = $imageName;
  //   $image->description = $description;
  //   $image->article()->associate($article);
  //   $image->save();
  // }

  // public static function storeLocalFile($requestImage, $filePath)
  // {
  //   if ($requestImage) {
  //     $image = $requestImage;
  //     $imageName = time() . '.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
  //     Image::make($requestImage)->save(public_path($filePath) . $imageName);
  //     return $imageName;
  //   }
  // }


//Pessoais

  public static function createFolk($request)
  {
    $folk = Folk::create([
      'name'=>$request->name, 
      'lastname'=>$request->lastname,
      'gender'=>$request->gender, 
      'avatar'=>$request->avatar, 
      'ic'=>$request->ic, 
      'nif'=>$request->nif, 
      'birthdate'=>$request->birthdate, 
      ]);
    return $folk;
  }
  
}
