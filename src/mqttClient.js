import mqtt from 'mqtt'

const brokerUrl = import.meta.env.VITE_MQTT_URL || 'ws://localhost:8083/mqtt'
const username = import.meta.env.VITE_MQTT_USERNAME || ''
const password = import.meta.env.VITE_MQTT_PASSWORD || ''

let client

export const connectMqtt = () => {
  if (client && client.connected) {
    return client
  }
  client = mqtt.connect(brokerUrl, {
    username: username || undefined,
    password: password || undefined,
    reconnectPeriod: 2000,
    connectTimeout: 10_000,
    keepalive: 60,
    clean: true,
    protocolVersion: 4,
  })
  return client
}

export const disconnectMqtt = () => {
  if (client) {
    client.end(true)
    client = undefined
  }
}

export const getClient = () => client 