<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Folder;

class FolderController extends Controller
{
    /**
     * Display a listing of the folders.
     */
    public function index(Request $request)
    {
        $folder = Folder::with('children.files');
        if(!$request->search) {
            $folders = $folder->whereNull('parent_id')->get();
        } else {
            $folders = $folder->where('name', 'like', '%' . $request->search . '%')->get();
        }
        return response()->json($folders);
    }

    /**
     * Store a newly created folder in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:folders,id', // Optional parent folder
        ]);

        $folder = Folder::create($validated);
        return response()->json($folder, 201);
    }

    /**
     * Display the specified folder and its subfolders/files.
     */
    public function show($id)
    {
        $folder = Folder::with('children','files')->find($id);

        if (!$folder) {
            return response()->json(['message' => 'Folder not found'], 404);
        }

        return response()->json($folder);
    }

    /**
     * Display the specified folder and its subfolders/files.
     */
    public function showChildren($id)
    {
        $folder = Folder::with('children','files')->where('parent_id', $id)->get();

        if (!$folder) {
            return response()->json(['message' => 'Folder not found'], 404);
        }

        return response()->json($folder);
    }

    /**
     * Update the specified folder in storage.
     */
    public function update(Request $request, $id)
    {
        $folder = Folder::find($id);

        if (!$folder) {
            return response()->json(['message' => 'Folder not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'parent_id' => 'nullable|exists:folders,id',
        ]);

        $folder->update($validated);
        return response()->json($folder);
    }

    /**
     * Remove the specified folder from storage.
     */
    public function destroy($id)
    {
        $folder = Folder::find($id);

        if (!$folder) {
            return response()->json(['message' => 'Folder not found'], 404);
        }

        $folder->delete();
        return response()->json(['message' => 'Folder deleted successfully']);
    }
}
