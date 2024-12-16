import React, { useState } from 'react';
import FolderTree from './FolderTree';
import FolderDetails from './FolderDetails';

const Explorer = () => {
    const [selectedFolderId, setSelectedFolderId] = useState(null);

    const handleFolderClick = (id) => {
        setSelectedFolderId(id);
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: '30%', borderRight: '1px solid #ddd', overflowY: 'auto' }}>
                <FolderTree onFolderClick={handleFolderClick} />
            </div>
            <div style={{ flex: 1, padding: '10px' }}>
                {selectedFolderId ? (
                    <FolderDetails folderId={selectedFolderId} />
                ) : (
                    <p>Select a folder to view its contents</p>
                )}
            </div>
        </div>
    );
};

export default Explorer;
