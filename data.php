<?php

// Create connection
$conn = new SQLite3('x3d_models.db');

// Check connection
if (!$conn) {
    die("Connection failed: " . $conn->lastErrorMsg());
}

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['model_name'])) {
    // Retrieve model name from POST request
    $modelName = $_POST['model_name'];
    
    // Perform SELECT query to retrieve model URL and description based on model name
    $stmt = $conn->prepare('SELECT url, description FROM x3d_file WHERE file_name = :model_name');
    $stmt->bindValue(':model_name', $modelName, SQLITE3_TEXT);
    $result = $stmt->execute();

    // Fetch the model URL and description
    if ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $modelUrl = $row['url'];
        $description = $row['description'];

        // Return model URL and description as JSON
        echo json_encode(['url' => $modelUrl, 'description' => $description]);
    } else {
        // Model not found
        echo json_encode(['error' => 'Model not found']);
    }
} else {
    // Invalid request
    echo json_encode(['error' => 'Invalid request']);
}

// Close connection
$conn->close();
?>
