import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FolderTree = ({ onFolderClick }) => {
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        // Fetch all folders
        axios.get('/api/folders')
            .then((response) => setFolders(response.data))
            .catch((error) => console.error(error));
    }, []);

    const renderFolders = (folders, parentId = null) => {
        return folders.map(folder => (
            <li key={folder.id} style={{ cursor: 'pointer' }}>
                <div onClick={() => onFolderClick(folder.id)}>
                    {folder.name}
                </div>
                {folder.children && folder.children.length > 0 && (
                    <ul>{renderFolders(folder.children)}</ul>
                )}
            </li>
        ));
    };

    return (
        <div>
            <h3>Windows Explorer</h3>
            <ul>{renderFolders(folders)}</ul>
        </div>
    );
};

export default FolderTree;
