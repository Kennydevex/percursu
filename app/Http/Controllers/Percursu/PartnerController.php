<?php

namespace Percursu\Http\Controllers\Percursu;

use Partner;
use Company;
use Experience;
use Formation;
use Skill;
use Illuminate\Http\Request;
use Auth;

class PartnerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // $folk = Common::createFolk($request);
        //Utilizador
        $user = auth()->user();

        $partner = Partner::create([
            'status'=>$request->status, 
            'folk_id'=>$user->folk->id, 
        ]);

        for ($i=0; $i < count($request->experiences); $i++) {
            $experience = Experience::create([
                'task'=>$request->task, 
                'from'=>$request->from, 
                'to'=>$request->to, 
                'ongoing'=>$request->ongoing, 
                'employer'=>$request->employer, 
                'responsibility'=>$request->responsibility, 
                'attachment'=>$request->attachment, 
                'partner_id'=>$partner->id, 
            ]);
        }

        for ($i=0; $i < count($request->experiences); $i++) {
            $formation = Formation::create([
                'designation'=>$request->designation, 
                'from'=>$request->from, 
                'to'=>$request->to, 
                'ongoing'=>$request->ongoing, 
                'institution'=>$request->institution, 
                'subjects'=>$request->subjects, 
                'country'=>$request->country, 
                'city'=>$request->city, 
                'attachment'=>$request->attachment, 
                'partner_id'=>$partner->id, 
            ]);
        }

        for ($i=0; $i < count($request->formations); $i++) {
            $formation = Formation::create([
                'designation'=>$request->designation, 
                'from'=>$request->from, 
                'to'=>$request->to, 
                'ongoing'=>$request->ongoing, 
                'institution'=>$request->institution, 
                'subjects'=>$request->subjects, 
                'country'=>$request->country, 
                'city'=>$request->city, 
                'attachment'=>$request->attachment, 
                'partner_id'=>$partner->id, 
            ]);
        }

        for ($i=0; $i < count($request->skills); $i++) {
            $formation = Formation::create([
                'name'=>$request->designation, 
                'description'=>$request->from,
                'partner_id'=>$partner->id,  
            ]);
        }

        $partner->sync($request->charges);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \Percursu\Models\Percursu\Partner  $partner
     * @return \Illuminate\Http\Response
     */
    public function show(Partner $partner)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \Percursu\Models\Percursu\Partner  $partner
     * @return \Illuminate\Http\Response
     */
    public function edit(Partner $partner)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Percursu\Models\Percursu\Partner  $partner
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Partner $partner)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Percursu\Models\Percursu\Partner  $partner
     * @return \Illuminate\Http\Response
     */
    public function destroy(Partner $partner)
    {
        //
    }
}
