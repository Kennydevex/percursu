<?php

namespace Percursu\Http\Controllers\Percursu;

use Percursu\Http\Controllers\Controller;
use Partner;
use Address;
use Location;
use Company;
use Experience;
use Formation;
use Skill;
use Site;
use Social;
use Courier;
use Phone;
use Illuminate\Http\Request;
use Auth;
use Folk;
use PartnerCollection;
use Percursu\Http\Requests\Helpers\FolkRequest;


class PartnerController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $partners = Partner::all();
        $partners = Partner::orderBy('created_at', 'desc')->get();
        $partners->each(function ($partners) {
            $partners->folk->user;
        });
        return new PartnerCollection($partners);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PartnerRequest $request)
    {
        // if (auth()->user()->folk->partner) {
        //     return response()->json([
        //         'exist' => true,
        //         'msg' => 'Aconcelhamos que atualizes os seus dados, pois, já tens um percurso registado ',
        //     ]);
        // }
        $folk = Folk::findOrfail(auth()->user()->folk->id);
        $folk->update([
            'name' => $request->input('partner.name'),
            'lastname' => $request->input('partner.lastname'),
            'gender' => $request->input('partner.gender'),
            'avatar' => $request->input('partner.avatar'),
            'ic' => $request->input('partner.ic'),
            'nif' => $request->input('partner.nif'),
            'birthdate' => $request->input('partner.birthdate'),
        ]);

        $location = Location::create([
            'lat' => $request->input('location.lat'),
            'lng' => $request->input('location.lng'),
        ]);

        $address = Address::create([
            'country' => $request->input('address.country'),
            'city' => $request->input('address.city'),
            'street' => $request->input('address.street'),
            'postcode' => $request->input('address.postcode'),
            'location_id' => $location->id,
            'folk_id' => $folk->id,
        ]);

        $partner = Partner::create([
            'status' => $request->status,
            'folk_id' => $folk->id
        ]);

        for ($i = 0; $i < count($request->phones); $i++) {
            $phone = new Phone();
            $phone->number = $request->input('phones.' . $i . '.number');
            $phone->type = $request->input('phones.' . $i . '.type');
            $phone->folk()->associate($folk);
            $phone->save();
        }

        for ($i = 0; $i < count($request->couriers); $i++) {
            $courier = new Courier();
            $courier->email = $request->input('couriers.' . $i . '.email');
            $courier->type = $request->input('couriers.' . $i . '.type');
            $courier->folk()->associate($folk);
            $courier->save();
        }

        if (sizeof($request->sites)) {
            for ($i = 0; $i < count($request->sites); $i++) {
                $site = new Site();
                $site->link = $request->input('sites.' . $i . '.link');
                $site->description = $request->input('sites.' . $i . '.description');
                $site->partner()->associate($partner);
                $site->save();
            }
        }

        if (sizeof($request->socials)) {
            for ($i = 0; $i < count($request->socials); $i++) {
                $site = new Social();
                $site->name = $request->input('socials.' . $i . '.name');
                $site->link = $request->input('socials.' . $i . '.link');
                $site->partner()->associate($partner);
                $site->save();
            }
        }

        for ($i = 0; $i < count($request->experiences); $i++) {
            $experience = new Experience();
            $experience->task = $request->input('experiences.' . $i . '.task');
            $experience->from = $request->input('experiences.' . $i . '.from');
            $experience->to = $request->input('experiences.' . $i . '.to');
            $experience->ongoing = $request->input('experiences.' . $i . '.ongoing');
            $experience->employer = $request->input('experiences.' . $i . '.employer');
            $experience->responsibility = $request->input('experiences.' . $i . '.responsibility');
            $experience->attachment = $request->input('experiences.' . $i . '.attachment');
            $experience->partner()->associate($partner);
            $experience->save();
        }

        for ($i = 0; $i < count($request->formations); $i++) {
            $formation = new Formation();
            $formation->designation = $request->input('formations.' . $i . '.designation');
            $formation->from = $request->input('formations.' . $i . '.from');
            $formation->to = $request->input('formations.' . $i . '.to');
            $formation->ongoing = $request->input('formations.' . $i . '.ongoing');
            $formation->institution = $request->input('formations.' . $i . '.institution');
            $formation->subjects = $request->input('formations.' . $i . '.subjects');
            $formation->country = $request->input('formations.' . $i . '.country');
            $formation->city = $request->input('formations.' . $i . '.city');
            $formation->attachment = $request->input('formations.' . $i . '.attachment');
            $formation->partner()->associate($partner);
            $formation->save();
        }

        for ($i = 0; $i < count($request->skills); $i++) {
            $skill = new Skill();
            $skill->name = $request->input('skills.' . $i . '.name');
            $skill->description = $request->input('skills.' . $i . '.description');
            $skill->partner()->associate($partner);
            $skill->save();
        }

        if (count($request->charges) > 0) {
            $partner->sync($request->charges);
        }

        return response()->json([
            'exist' => false,
            'msg' => 'Dados registados com sucesso ',
        ]);
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
