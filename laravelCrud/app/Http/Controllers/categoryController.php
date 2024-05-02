<?php

namespace App\Http\Controllers;
use App\Models\category;

use Illuminate\Http\Request;

class categoryController extends Controller
{

    // add categories
    function addCategories(Request $request){
        $object = new Category();
        // validation
        $request->validate([
            "cName"=>"required",
            "cFile"=>"required|image:jpg,png,jpeg|max:3000"]);
        $categoryImage=time().".".$request->cFile->extension();
        $request->cFile->move(public_path("assets/categories"),$categoryImage);
        $object->catName=$request->cName;
        $object->catImage=$categoryImage;
        $object->save();
        return back()->with("AddCate","category add Successfully");

    }
    //view categories
    function viewCategories(){
        $object = Category::all();
        return view('viewcat',compact('object'));
    }
    // edit view
    function editViewCategory($primaryKey){
        $object=Category::find($primaryKey);
        return view('update',compact('object'));
            }
            // update cate
            function updateCategory(Request $request){
                $object = Category::find($request->cId);
                if(isset($request->cFile)){
                    $categoryImage=time().".".$request->cFile->extension();
                    $request->cFile->move(public_path("assets/categories"),$categoryImage);
                    $object->catImage=$categoryImage;
                }
                $object->catName=$request->cName;
                $object->save();
                return redirect('details')->with('UpdateCat',"category update succesfully");
            }
            // delete cat
            function deleteCategory($primaryKey){
                $object = Category::find($primaryKey);
                $object->delete();
                return redirect('details')->with('deleteCat','category delete successfully');
            }
}
