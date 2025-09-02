import mqtt from 'mqtt'

const brokerUrl = import.meta.env.VITE_MQTT_URL || 'ws://localhost:8083/mqtt'
const username = import.meta.env.VITE_MQTT_USERNAME || ''
const password = import.meta.env.VITE_MQTT_PASSWORD || ''

let client

export const connectMqtt = () => {
  if (client && client.connected) {
    return client
  }

  try {
    client = mqtt.connect(brokerUrl, {
      username: username || undefined,
      password: password || undefined,
      reconnectPeriod: 2000,
      connectTimeout: 10_000,
      keepalive: 60,
      clean: true,
      protocolVersion: 4,
    })

    // Add error handling for connection
    client.on('error', (error) => {
      console.error('MQTT connection error:', error)
    })

    client.on('offline', () => {
      console.warn('MQTT client is offline')
    })

    return client
  } catch (error) {
    console.error('Failed to create MQTT client:', error)
    return null
  }
}

export const disconnectMqtt = () => {
  if (client) {
    client.end(true)
    client = undefined
  }
}

export const getClient = () => client
