The solution involves using the `ref` to access the camera component and a state variable to ensure the camera is ready before using the `takePictureAsync` function. The `onCameraReady` event is used to update the state once the camera has fully initialized.

```javascript
import * as React from 'react';
import { Camera, useCameraDevices } from 'expo-camera';

function App() {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const devices = useCameraDevices();
  const [cameraReady, setCameraReady] = React.useState(false);
  const cameraRef = React.useRef(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />; 
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if(cameraReady) {
      let photo = await cameraRef.current.takePictureAsync();
      console.log('photo', photo);
    }
  };

  return (
    <View style={styles.container}>
        <Camera
            style={styles.camera}
            type={type}
            ref={cameraRef}
            onCameraReady={() => setCameraReady(true)}
        >
          <View style={styles.buttonContainer}>
            <Button title="Take Picture" onPress={takePicture} />
          </View>
        </Camera> 
    </View>
  );
}
```