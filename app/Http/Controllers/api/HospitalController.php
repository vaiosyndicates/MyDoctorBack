<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Kreait\Firebase;
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;


class HospitalController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
			//
			try {
				//code...
				$arr = [];
				$factory = (new Factory)->withServiceAccount(dirname(__DIR__) . '/Auth/firebaseKey.json');
				$database = $factory->createDatabase();
				$reference = $database->getReference('/hospitals');
				$value = $reference->getValue();
				$clean = array_filter($value);
				foreach ($clean as $key => $value) {
					$arr[$key]['id'] = $clean[$key]['id'];
					$arr[$key]['data'][$key]['address'] = $clean[$key]['address'];
					$arr[$key]['data'][$key]['thumbnail'] = $clean[$key]['thumbnail'];
					$arr[$key]['data'][$key]['title'] = $clean[$key]['title'];
					$arr[$key]['data'][$key]['type'] = $clean[$key]['type'];
					
				}
				return response()->json($clean);
			} catch (\Throwable $th) {
				throw $th;
			}
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function create()
	{
			//
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
			$factory = (new Factory)->withServiceAccount(dirname(__DIR__) . '/Auth/firebaseKey.json');
			$database = $factory->createDatabase();
			// $reference = $database->getReference('/hospitals');
			$data = $request->all();
			$id = $data['id'];
			$title = $data['name'];
			$type = $data['type'];
			$address = $data['address'];
			$thumbnail = $data['image'];

			$toFirebase = [
				'id' =>  $id,
				'title' =>  $title,
				'type' =>  $type,
				'address' =>  $address,
				'thumbnail' => $thumbnail
			];

			try {
				$createPost = $database
				->getReference('hospitals')
				->push($toFirebase);
				$response = 'successs';
				return response($response, 200);

			} catch (\Throwable $th) {
				throw $th;
			}
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function show($id)
	{
			//
			$factory = (new Factory)->withServiceAccount(dirname(__DIR__) . '/Auth/firebaseKey.json');
			$database = $factory->createDatabase();


			try {
				//code...
				$reference = $database->getReference('/hospitals/'.$id);
				$value = $reference->getValue();
				return response()->json($value);

			} catch (\Throwable $th) {
				throw $th;
			}

	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function edit($id)
	{
			//
			$factory = (new Factory)->withServiceAccount(dirname(__DIR__) . '/Auth/firebaseKey.json');
			$database = $factory->createDatabase();
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, $id)
	{
			//
			$factory = (new Factory)->withServiceAccount(dirname(__DIR__) . '/Auth/firebaseKey.json');
			$database = $factory->createDatabase();
			
			$uid = $id;
			$data = $request->all();

			$id = $id;
			$title = $data['name'];
			$type = $data['type'];
			$address = $data['address'];
			$thumbnail = $data['image'];

			try {
				//code...
				$toFirebase = [
					'id' =>  $id,
					'title' =>  $title,
					'type' =>  $type,
					'address' =>  $address,
					'thumbnail' => $thumbnail
				];

				$updates = [
					'hospitals/'.$uid => $toFirebase,
				];

				$database->getReference() // this is the root reference
				 ->update($updates);
				
				$response = 'successs';
				return response()->json($response, 200);
				 
			} catch (\Throwable $th) {
				throw $th;
			}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id)
	{
			//
			$factory = (new Factory)->withServiceAccount(dirname(__DIR__) . '/Auth/firebaseKey.json');
			$database = $factory->createDatabase();
			
			try {
				//code...
				$database->getReference('hospitals/'.$id)->remove();
				$response = 'successs';
				return response()->json($response, 200);
				
			} catch (\Throwable $th) {
				throw $th;
			}
	}
}
