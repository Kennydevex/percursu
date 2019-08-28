<?php

namespace Percursu\Http\Controllers\System;

use Percursu\Http\Controllers\Controller;
use Permission;
use Illuminate\Http\Request;
use Percursu\Http\Resources\System\PermissionCollection;
use Percursu\Http\Requests\System\PermissionRequest;
use Percursu\Http\Resources\System\Permission as PermissionResource;


class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $permissions = Permission::all();
        return new PermissionCollection($permissions);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Permission::create([
            'name' => $request->name,
            'display_name' => $request->display_name,
            'description' => $request->description,
        ]);

        return response()->json([
            'msg' => 'Operação efetuada com sucesso!',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \Percursu\Models\System\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function show(Permission $permission)
    {
        $permissionData = Permission::findOrfail($permission);
        return new PermissionResource($permissionData);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Percursu\Models\System\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Permission $permission)
    {
        $permission = Permission::findOrfail($permission);
        $permission->update([
            'name' => $request->name,
            'display_name' => $request->display_name,
            'description' => $request->description,
        ]);

        return response()->json([
            'msg' => 'Operação efetuada com sucesso!',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Percursu\Models\System\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $permission = Permission::findOrfail($id);
        $permission->delete();
        return response()->json([
            'msg' => 'Permissão eliminada com sucesso',

        ]);
    }
}
