import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import useFetchData from '../hooks/useFetchData';
import useConnectivitySnackBar from '../hooks/useConnectivitySnackBar';

function TrendingScreen() {
  const { isConnected, SnackbarComponent } = useConnectivitySnackBar();

  // Fetch only when connected
  const { data, error, loading } = useFetchData(
    isConnected ? 'https://dummyjson.com/products' : null
  );

  // If not connected, show error early and skip further logic
  if (!isConnected) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No internet connection</Text>
        <SnackbarComponent />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {loading && (
        <View style={styles.centered}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}

      {error && (
        <View style={styles.centered}>
          <Text style={styles.errorText}>Error: {error.message}</Text>
        </View>
      )}

      {data && (
        <FlatList
          data={data.products}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
            </View>
          )}
        />
      )}

      {!loading && !data && !error && (
        <View style={styles.centered}>
          <Text style={styles.noDataText}>No data available</Text>
        </View>
      )}
    </View>
  );
}

export default TrendingScreen;


//Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  description: {
    color: '#666',
    marginTop: 6,
    marginBottom: 8,
  },
  price: {
    color: '#1e90ff',
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  noDataText: {
    color: '#888',
  }, 
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
});