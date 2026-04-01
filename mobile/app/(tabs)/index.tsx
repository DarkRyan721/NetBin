import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import SVG_NetBin_Logo from '@/assets/svg/Svg_Image';
import { useAuth } from '@/context/AuthContext';
import { router, useRouter } from 'expo-router';


export default function HomeScreen() {

  const { login } = useAuth(); // Extrae la función `login` del contexto
  const router = useRouter();
  
  const [isLogin, setIsLogin] = useState(true); // Controla si estamos en login o registro
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Estados para el formulario de registro
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.12/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password,
        }),
      });
      const data = await response.json();

      if (response.ok && data.token) {
        login(data.token); // Llama al contexto para autenticar y guardar el token
        Alert.alert('Login exitoso', 'Bienvenido a NetBin');
        router.push('/'); // Redirigir al home después del login
      } else {
        Alert.alert('Error de Login', 'Credenciales incorrectas o usuario no encontrado');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };


  const handleRegister = async () => {
    if (!firstname || !lastname || !newUsername || !newPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.12/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname,
          lastname,
          username: newUsername,
          password: newPassword,
        }),
      });
      const data = await response.json();

      if (response.ok && data.state === 'Usuario guardado correctamente') {
        Alert.alert('Registro exitoso', 'Puedes iniciar sesión ahora');
        setIsLogin(true); // Cambia a login después de un registro exitoso
      } else if (data.state === 'El usuario ya está registrado.') {
        Alert.alert('Registro Fallido', data.state);
      } else {
        Alert.alert('Error', 'Algo salió mal al registrar');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#000000', dark: '#000000' }}
      headerImage={
        <View>
          <SVG_NetBin_Logo style={styles.netbinLogo} />
        </View>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to NetBin</ThemedText>
      </ThemedView>

      {isLogin ? (
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Login</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Login" onPress={handleLogin} />
          <ThemedText style={styles.switchText}>
            ¿No tienes cuenta?{' '}
            <ThemedText style={styles.link} onPress={() => setIsLogin(false)}>
              Regístrate aquí
            </ThemedText>
          </ThemedText>
        </ThemedView>
      ) : (
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Registro</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstname}
            onChangeText={setFirstname}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastname}
            onChangeText={setLastname}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={newUsername}
            onChangeText={setNewUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <Button title="Register" onPress={handleRegister} />
          <ThemedText style={styles.switchText}>
            ¿Ya tienes cuenta?{' '}
            <ThemedText style={styles.link} onPress={() => setIsLogin(true)}>
              Inicia sesión aquí
            </ThemedText>
          </ThemedText>
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  netbinLogo: {
    height: 178,
    width: 290,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -290 / 2 }, { translateY: -178 / 2 }],
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  switchText: {
    marginTop: 10,
    textAlign: 'center',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
