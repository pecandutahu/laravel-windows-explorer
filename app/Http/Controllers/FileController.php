<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\File;
use App\Models\Folder;

class FileController extends Controller
{
    /**
     * Store a newly created file in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'folder_id' => 'required|exists:folders,id', // Folder harus valid
            'name' => 'required|string|max:255',
        ]);

        // Cari folder berdasarkan ID
        $folder = Folder::find($request->folder_id);

        // Simpan data file ke database
        $file = File::create([
            'folder_id' => $folder->id,
            'name' => $request->name,
        ]);

        return response()->json([
            'message' => 'File created successfully.',
            'file' => $file,
        ]);
    }
    
    /**
     * Update data
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255', // Nama file baru (opsional)
        ]);

        // Cari file berdasarkan ID
        $file = File::find($id);
        
        if (!$file) {
            return response()->json(['message' => 'File not found'], 404);
        }

        $file->update($validated);

        return response()->json([
            'message' => 'File updated successfully.',
            'file' => $file,
        ]);
    }

    public function destroy($id)
    {
        // Cari file berdasarkan ID
        $file = File::find($id);

        if (!$file) {
            return response()->json(['message' => 'File not found'], 404);
        }
        // Hapus data file dari database
        $file->delete();

        return response()->json([
            'message' => 'File deleted successfully.',
        ]);
    }


}
