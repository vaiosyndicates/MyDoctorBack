<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Kreait\Firebase;
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;

class NewsController extends Controller
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
				$factory = (new Factory)->withServiceAccount(dirname(__DIR__) . '/Auth/firebaseKey.json');
				$database = $factory->createDatabase();
				$reference = $database->getReference('/news');
				$value = $reference->getValue();
				$clean = array_filter($value);
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

				$data = $request->all();
				$id = $data['id'];
				$title = $data['title'];
				$date = $data['date'];
				$body = $data['body'];
				$thumbnail = $data['image'];
	
				$toFirebase = [
					'id' =>  $id,
					'title' =>  $title,
					'date' =>  $date,
					'body' =>  $body,
					'thumbnail' => $thumbnail
				];
	
				try {
					$createPost = $database
					->getReference('news')
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
	
				try {
					//code...
					$reference = $database->getReference('news/'.$id);
					$value = $reference->getValue();
					return response()->json($value);
	
				} catch (\Throwable $th) {
					throw $th;
				}
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

			$title = $data['title'];
			$date = $data['date'];
			$body = $data['body'];
			$thumbnail = $data['image'];

			try {
				//code...
				$toFirebase = [
					'id' =>  $uid,
					'title' =>  $title,
					'date' =>  $date,
					'body' =>  $body,
					'thumbnail' => $thumbnail
				];

				$updates = [
					'news/'.$uid => $toFirebase,
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
					$database->getReference('news/'.$id)->remove();
					$response = 'successs';
					return response()->json($response, 200);
					
				} catch (\Throwable $th) {
					throw $th;
				}
    }
}
