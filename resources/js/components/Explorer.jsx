import React, { useState } from 'react';
import FolderTree from './FolderTree';
import FolderDetails from './FolderDetails';
import { Typography } from '@material-tailwind/react';


const Explorer = () => {
    const [selectedFolderId, setSelectedFolderId] = useState(null);

    const handleFolderClick = (id) => {
        setSelectedFolderId(id);
    };

    return (
    <div className="flex h-screen">
        <div className="w-1/3 border-r border-gray-300 overflow-y-auto bg-gray-50">
            <FolderTree onFolderClick={handleFolderClick} />
        </div>
        <div className="flex-1 p-4">
            {selectedFolderId ? (
                <FolderDetails folderId={selectedFolderId} />
            ) : (
                <Typography variant="h5" color="blue-gray">
                    Subfolders And Files
                </Typography>
            )}
        </div>
    </div>

        
    );
};
export default Explorer;