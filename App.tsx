import * as React from "react";

import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import FairmaticSDK, {
	type DriverAttributes,
	type FairmaticConfiguration,
	type FairmaticOperationResult,
	type FairmaticTripNotification,
} from "react-native-fairmatic-sdk";

export default function App() {
	React.useEffect(() => {}, []);
	const [isLoading, setIsLoading] = React.useState(false);

	const handleUtility = (): void => {
		handleGetSDKBuildVersion();
	};
	const handleGetSDKBuildVersion = (): void => {
		FairmaticSDK.getBuildVersion().then((version) => {
			console.log("Build Version : ", version);
		});
	};

	const handleGetFairmaticSettings = (): void => {
		FairmaticSDK.getFairmaticSettings()
			.then((settings) => {
				console.log("Fairmatic Settings:", settings);
				if (settings && settings.length > 0) {
					console.log("Detected Fairmatic Setting Errors:");
					settings.forEach((settingError) => {
						console.log(`- Error: ${settingError}`);
					});
				} else {
					console.log("No Fairmatic setting errors detected");
				}
			})
			.catch((error) => {
				console.error("Failed to get Fairmatic settings:", error);
			});
	};

	const handleWipeOut = (): void => {
		console.log("Wiping out Fairmatic SDK");
		FairmaticSDK.wipeOut()
			.then((result) => {
				if (result.isSuccess) console.log("wipeOut successful");
				else console.log("wipeOut failed because of ", result.errorMessage);
			})
			.catch((error) => {
				console.error("error wiping out", error);
			});
	};

	const handleSetup = (): void => {
		const driverAttributes: DriverAttributes = {
			firstName: "John",
			lastName: "Doe",
			email: "john.doe@example.com",
			phoneNumber: "123-456-7890",
		};

		const fairmaticNotification: FairmaticTripNotification = {
			title: "Fairmatic Trip",
			content: "Monitoring a trip",
			iconResourceName: "fm_car",
		};

		// Replace with your SDK key
		const sdk_key = "your_sdk_key_here";

		const fairmaticConfiguration: FairmaticConfiguration = {
			sdkKey: sdk_key,
			driverId: "driverId",
			driverAttributes: driverAttributes,
			notification: fairmaticNotification,
		};

		FairmaticSDK.setup(fairmaticConfiguration)
			.then((result: FairmaticOperationResult) => {
				console.log("response: ", result);
				if (result.isSuccess) console.log("Setup Successful");
				else console.log("Setup Failed because of ", result.errorMessage);
			})
			.catch((error: any) => {
				console.error("Error setting up Fairmatic SDK:", error);
			});
	};

	const handleStartPeriod1 = (): void => {
		const trackingId: string = "p1-tracking-id";
		FairmaticSDK.startDriveWithPeriod1(trackingId)
			.then((result: FairmaticOperationResult) => {
				if (result.isSuccess) console.log("P1 drive started successfully");
				else console.log("Drive failed because of ", result.errorMessage);
			})
			.catch((error: any) => {
				console.error("Error starting P1 drive:", error);
			});
	};

	const handleStartPeriod2 = (): void => {
		const trackingId: string = "p2-tracking-id";
		FairmaticSDK.startDriveWithPeriod2(trackingId)
			.then((result: FairmaticOperationResult) => {
				if (result.isSuccess) console.log("P2 drive started successfully");
				else console.log("Drive failed because of ", result.errorMessage);
			})
			.catch((error: any) => {
				console.error("Error starting P2 drive:", error);
			});
	};

	const handleStartPeriod3 = (): void => {
		const trackingId: string = "p3-tracking-id";
		FairmaticSDK.startDriveWithPeriod3(trackingId)
			.then((result: FairmaticOperationResult) => {
				if (result.isSuccess) console.log("P3 drive started successfully");
				else console.log("Drive failed because of ", result.errorMessage);
			})
			.catch((error: any) => {
				console.error("Error starting P3 drive:", error);
			});
	};

	const handleStopPeriod = (): void => {
		FairmaticSDK.stopPeriod()
			.then((result: FairmaticOperationResult) => {
				if (result.isSuccess) console.log("Period stopped successfully");
				else console.log("Period stop failed because of ", result.errorMessage);
			})
			.catch((error: any) => {
				console.error("Error stopping period:", error);
			});
	};

	const handleTeardown = (): void => {
		FairmaticSDK.teardown()
			.then(() => {
				console.log("Teardown successful");
			})
			.catch((error: any) => {
				console.error("Error tearing down Fairmatic SDK:", error);
			});
	};

	const handleOpenReportIncident = (): void => {
		setIsLoading(true);
		FairmaticSDK.openIncidentReportingWebPage()
			.then(() => {
				console.log("Incident reporting web page opened successfully");
			})
			.catch((error: any) => {
				console.error("Error opening incident reporting web page:", error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Fairmatic SDK React Native Sample</Text>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.customButton} onPress={handleSetup}>
					<Text style={styles.buttonText}>Setup SDK</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.periodsGrid}>
				<View style={styles.periodButtonContainer}>
					<TouchableOpacity
						style={styles.customButton}
						onPress={handleStartPeriod1}
					>
						<Text style={styles.buttonText}>Start Period 1</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.periodButtonContainer}>
					<TouchableOpacity
						style={styles.customButton}
						onPress={handleStartPeriod2}
					>
						<Text style={styles.buttonText}>Start Period 2</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.periodButtonContainer}>
					<TouchableOpacity
						style={styles.customButton}
						onPress={handleStartPeriod3}
					>
						<Text style={styles.buttonText}>Start Period 3</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.periodButtonContainer}>
					<TouchableOpacity
						style={[styles.customButton, { backgroundColor: "#f25783" }]}
						onPress={handleStopPeriod}
					>
						<Text style={styles.buttonText}>Stop Period</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.customButton} onPress={handleTeardown}>
					<Text style={styles.buttonText}>Teardown</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.customButton} onPress={handleWipeOut}>
					<Text style={styles.buttonText}>Wipe Out</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.customButton}
					onPress={handleGetFairmaticSettings}
				>
					<Text style={styles.buttonText}>Get Settings</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.customButton}
					onPress={handleOpenReportIncident}
				>
					<Text style={styles.buttonText}>Report an Incident</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.customButton} onPress={handleUtility}>
					<Text style={styles.buttonText}>Utility Button</Text>
				</TouchableOpacity>
			</View>
			{/* show a modal with dimming effect and a loading indicator in the center */}
			{isLoading && (
				<View style={styles.loadingModalDimming}>
					<View style={styles.loadingIndicator}>
						<ActivityIndicator
							size="large"
							color="#007AFF"
							style={styles.loadingSpinner}
						/>
					</View>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 16,
	},
	periodsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		marginVertical: 8,
	},
	periodButtonContainer: {
		width: "48%",
		marginVertical: 8,
	},
	buttonContainer: {
		marginVertical: 8,
	},
	customButton: {
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
		backgroundColor: "#007AFF",
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "500",
	},
	label: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 16,
	},
	claimsAPIContainerRow: {
		flexDirection: "row",
		justifyContent: "center",
		marginVertical: 8,
		gap: 16,
	},
	claimsAPIButton: {
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
		backgroundColor: "#007AFF",
	},
	claimsAPIButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "500",
	},
	loadingModalDimming: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	loadingIndicator: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
	},
	loadingSpinner: {
		transform: [{ scale: 2 }],
	},
});
