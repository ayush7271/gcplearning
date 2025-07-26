import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const GetLocations = ({ setGeoAddress = () => { }, setAddressDetails = () => { } }) => {
    const [locationState, setLocationState] = useState({});
    // const profileData = useSelector((store) => store?.profile?.profileData);
    // const dispatch = useDispatch();
    // const cookieHandler = new Cookies();
    // const appVersionCode = cookieHandler.get('versionCode');
    // const deviceType = getPlatform(navigator.userAgent);
    //for android old version

    function getCurrentPosition() {
        return new Promise((resolve, reject) => {
            let isResolved = false;
            const timeout = setTimeout(() => {
                if (!isResolved) {
                    isResolved = true;
                    reject(new Error('Geolocation request timed out.'));
                }
            }, 6000);

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    if (!isResolved) {
                        clearTimeout(timeout);
                        isResolved = true;
                        resolve(position);
                    }
                },
                (error) => {
                    if (!isResolved) {
                        clearTimeout(timeout);
                        isResolved = true;
                        reject(error);
                    }
                }
            );
        });
    }

    const getGeocord = () => {
        getCurrentPosition()
            .then((position) => {
                console.log(position, 'position');
                if (position?.coords?.latitude) {
                    console.log(position)
                }
                setLocationState((prev) => ({
                    ...prev,
                    latitude: position?.coords?.latitude,
                    longitude: position?.coords?.longitude,
                }));
            })
            .catch((error) => {
                console.log(error);
                setLocationState((prev) => ({
                    ...prev,
                    showGeolocationMsg: true,
                    errorEvent: true,
                }));
                console.log('User denied geolocation permission.', error);
                // }
            });
    };

    function getForamtAddress(results) {
        const result = {};
        results?.forEach((item) => {
            item?.address_components?.forEach((component) => {
                component?.types?.forEach((type) => {
                    if (!result[type]) {
                        result[type] = [component?.long_name];
                    } else {
                        if (!result[type]?.includes(component?.long_name)) {
                            result[type]?.push(component?.long_name);
                        }
                    }
                });
            });
        });
        setGeoAddress(result);
        setLocationState((prev) => ({
            ...prev,
            geoAddress: result,
        }));
        return result;
    }

    function getCurrentLocation(latitude, longitude) {
        var apiKey = 'AIzaSyBE73sk79JNYCiQzr-CQAWwQDzqUdT7snw'; // Replace with your actual API key
        var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.status === 'OK') {
                    var results = data.results;
                    if (results.length > 0) {
                        getForamtAddress(results);
                    } else {
                        setLocationState((prev) => ({
                            ...prev,
                            showGeolocationMsg: true,
                            errorEvent: true,
                        }));
                        console.log('No results found.');
                    }
                } else {
                    if (data?.error_message) {
                        setLocationState((prev) => ({
                            ...prev,
                            showGeolocationMsg: true,
                            errorEvent: true,
                        }));
                    }
                    console.log('Request failed.');
                }
            })
            .catch(function (error) {
                console.log(error, 'error');
                setLocationState((prev) => ({
                    ...prev,
                    showGeolocationMsg: true,
                    errorEvent: true,
                }));
            });
    }

    useEffect(() => {
        if (!locationState?.latitude) {
            return;
        } else {
            setAddressDetails((prevState) => ({
                ...prevState,
                latitude: locationState?.latitude,
                longitude: locationState?.longitude,
            }));
            getCurrentLocation(locationState?.latitude, locationState?.longitude);
        }
    }, [locationState?.latitude]);

    useEffect(() => {
        getGeocord();
    }, []);


    return (
        <>
            {/* {locationState?.showGeolocationMsg && !locationState?.geoAddress && (
				<LocationErrorPage
					showModal={locationState?.showGeolocationMsg && !locationState?.geoAddress}
					page={'address'}
					isApp={isHybridView()}
					profileData={profileData}
					closeButton={isHybridView() ? true : false}
				/>
			)} */}

            {!locationState?.showGeolocationMsg && (
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <div className='animate-spin rounded-full h-[60px] w-[60px] border-t-[2px] border-b-5 border-green-500'></div>
                </div>
            )}
        </>
    );
};

export default GetLocations;