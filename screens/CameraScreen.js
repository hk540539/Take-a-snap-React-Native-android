import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

export default class CameraScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasCameraPermission: null,
			type: Camera.Constants.Type.back,
			isFlashLightOn: Camera.Constants.FlashMode.off
		};
	}

	static navigationOption = {
		title: 'Camera'
	};

	//ask for camera permission

	async componentDidMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({
			hasCameraPermission: status === 'granted'
		});
	}

	//flip the camera
	flipCamera = () => {
		this.setState({
			type:
				this.state.type === Camera.Constants.Type.back
					? Camera.Constants.Type.front
					: Camera.Constants.Type.back
		});
	};

	//Toggle flash light
	flashLight = () => {
		this.setState({
			isFlashLightOn:
				this.state.isFlashLightOn === Camera.Constants.FlashMode.off
					? Camera.Constants.FlashMode.on
					: Camera.Constants.FlashMode.off
		});
	};

	//take picture and send that to home screen

	takePicture = async () => {
		if (this.camera) {
			let photo = await this.camera.takePictureAsync();
			this.props.navigation.navigate('Home', { photo: photo });
		}
	};

	render() {
		const { hasCameraPermission } = this.state;

		if (hasCameraPermission === null) {
			return (
				<View>
					<Text>Testing</Text>
				</View>
			);
		} else if (hasCameraPermission === false) {
			return (
				<View>
					<Text>No access to camera</Text>
				</View>
			);
		} else if (hasCameraPermission === true) {
			return (
				<View style={styles.container}>
					<Camera
						style={styles.cameraView}
						type={this.state.type}
						flashMode={this.state.isFlashLightOn}
						ref={(ref) => {
							this.camera = ref;
						}}
					>
						<View style={styles.actionContainer}>
							<TouchableOpacity onPress={() => this.flipCamera()} style={styles.iconHolder}>
								<FontAwesome name="camera" size={35} style={styles.icon} />
							</TouchableOpacity>
							<TouchableOpacity onPress={() => this.takePicture()} style={styles.iconHolder}>
								<FontAwesome name="circle" size={35} style={styles.icon} />
							</TouchableOpacity>
							<TouchableOpacity onPress={() => this.flashLight()} style={styles.iconHolder}>
								<FontAwesome name="flash" size={35} style={styles.icon} />
							</TouchableOpacity>
						</View>
					</Camera>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	cameraView: {
		flex: 1
	},
	actionContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'transparent'
	},
	iconHolder: {
		flex: 1,
		alignItems: 'center',
		alignSelf: 'flex-end'
	},
	icon: {
		marginBottom: 10,
		color: '#fff'
	}
});

// Tried functioal approach

// const CameraScreen = (props) => {
// 	const { hasCameraPermission, setCameraPermission } = useState(null);
// 	const { camType, setCamType } = useState(Camera.Constants.Type.back);
// 	const { flash, setFlash } = useState(Camera.Constants.FlashMode.off);

// 	// ask for camera permission and change state

// 	async function permission() {
// 		const { status } = await Permissions.askAsync(Permissions.CAMERA);
// 		setCameraPermission(status === 'granted');
// 	}
// 	// flip the camera and change state

// 	const flipCamera = () => {
// 		setCamType(camType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
// 	};

// 	// flip the camera and change state

// 	const flashLight = () => {
// 		setFlash(
// 			flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off
// 		);
// 	};

// 	//take picture and send it to home screen
// 	async function takePicture() {
// 		if (camera) {
// 			let photo = await camera.takePictureAsync();
// 			props.navigation.navigate('Home', { photo });
// 		}
// 	}

// 	// Ask permission for the app when it loads first time
// 	useEffect(() => {
// 		permission();
// 	}, []);

// 	// if (hasCameraPermission === null) {
// 	// 	return (
// 	// 		<View>
// 	// 			<Text>Testing</Text>
// 	// 		</View>
// 	// 	);
// 	// }
// 	if (hasCameraPermission === false) {
// 		return (
// 			<View>
// 				<Text>No access to camera</Text>
// 			</View>
// 		);
// 	} else if (hasCameraPermission === true) {
// 		return (
// 			<View style={styles.container}>
// 				<Camera
// 					style={styles.cameraView}
// 					type={camType}
// 					flashMode={flash}
// 					ref={(ref) => {
// 						camera = ref;
// 					}}
// 				>
// 					<View style={styles.actionContainer}>
// 						<TouchableOpacity onPress={() => flipCamera()} style={styles.iconHolder}>
// 							<FontAwesome name="camera" size={35} style={styles.icon} />
// 						</TouchableOpacity>
// 						<TouchableOpacity onPress={() => takePicture()} style={styles.iconHolder}>
// 							<FontAwesome name="circle" size={35} style={styles.icon} />
// 						</TouchableOpacity>
// 						<TouchableOpacity onPress={() => flashLight()} style={styles.iconHolder}>
// 							<FontAwesome name="flash" size={35} style={styles.icon} />
// 						</TouchableOpacity>
// 					</View>
// 				</Camera>
// 			</View>
// 		);
// 	}
// };

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1
// 	},
// 	cameraView: {
// 		flex: 1
// 	},
// 	actionContainer: {
// 		flex: 1,
// 		flexDirection: 'row',
// 		backgroundColor: 'transparent'
// 	},
// 	iconHolder: {
// 		flex: 1,
// 		alignItems: 'center',
// 		alignSelf: 'flex-end'
// 	},
// 	icon: {
// 		marginBottom: 10,
// 		color: '#fff'
// 	}
// });

// CameraScreen.navigationOptions = {
// 	title: 'Camera Screen'
// };
// export default CameraScreen;
