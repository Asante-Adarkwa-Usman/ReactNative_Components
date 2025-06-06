import { useEffect, useState, useRef } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { Snackbar } from 'react-native-paper';

const useConnectivitySnackBar = () => {
  const netInfo = useNetInfo();
  const [isConnected, setIsConnected] = useState(netInfo.isConnected ?? true);
  const snackbarCallbackRef = useRef(null);

  useEffect(() => {
    setIsConnected(netInfo.isConnected ?? false);
    if (snackbarCallbackRef.current) {
      if (netInfo.isConnected === false) {
        snackbarCallbackRef.current(true, 'No internet connection');
      } else if (netInfo.isConnected === true) {
        snackbarCallbackRef.current(true, 'Back online');
      }
    }
    // Only run when netInfo.isConnected changes
  }, [netInfo.isConnected]);

  const SnackbarComponent = () => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
      snackbarCallbackRef.current = (show, msg) => {
        setVisible(show);
        setMessage(msg);
      };
      // Cleanup on unmount
      return () => {
        snackbarCallbackRef.current = null;
      };
    }, []);

    return (
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000}
        action={{ label: 'OK', onPress: () => {} }}
      >
        {message}
      </Snackbar>
    );
  };

  return { isConnected, SnackbarComponent };
}

export default useConnectivitySnackBar;