<?php

namespace Percursu\Http\Controllers\Helpers;

use Percursu\Http\Controllers\Controller;
use Category;
use Illuminate\Http\Request;


class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::all();
        return response()->Json(['CATEGORY' => $categories], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
         $category = Category::create([
            'name' => $request->name,
            'description' => $request->description,
            'entity_id' => $request->entity,
        ]);
        return response()->Json(['msg' => "Operação efetuada com sucesso"], 200);

    }

    /**
     * Display the specified resource.
     *
     * @param  \Percursu\Models\Helpers\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        $category=Category::findOrfail($category);
        dd($category);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Percursu\Models\Helpers\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        $category=Category::findOrfail($category);
        // $category->update([
        //     'name' => $request->name,
        //     'description' => $request->description,
        //     'entity_id' => $request->entity,
        // ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Percursu\Models\Helpers\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        //
    }
}
