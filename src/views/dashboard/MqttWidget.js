import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CBadge,
  CRow,
  CCol,
  CFormInput,
  CButton,
} from '@coreui/react'
import { connectMqtt, getClient } from 'src/mqttClient'

const defaultTopic = import.meta.env.VITE_MQTT_TOPIC || 'test/topic'

const MqttWidget = () => {
  const [status, setStatus] = useState('disconnected')
  const [topic, setTopic] = useState(defaultTopic)
  const [payload, setPayload] = useState('')
  const [messages, setMessages] = useState([])
  const clientRef = useRef(null)

  const statusColor = useMemo(() => {
    if (status === 'connected') return 'success'
    if (status === 'reconnecting') return 'warning'
    return 'secondary'
  }, [status])

  useEffect(() => {
    const client = connectMqtt()

    if (!client) {
      setStatus('error')
      console.error('Failed to create MQTT client')
      return
    }

    clientRef.current = client

    const handleConnect = () => setStatus('connected')
    const handleReconnect = () => setStatus('reconnecting')
    const handleClose = () => setStatus('disconnected')
    const handleError = (error) => {
      setStatus('error')
      console.error('MQTT client error:', error)
    }

    client.on('connect', handleConnect)
    client.on('reconnect', handleReconnect)
    client.on('close', handleClose)
    client.on('error', handleError)

    client.subscribe(topic, { qos: 0 }, (err) => {
      if (err) {
        console.error('Subscribe error', err)
        setStatus('error')
      }
    })

    const messageHandler = (t, m) => {
      if (t !== topic) return
      const text = m.toString()
      setMessages((prev) => [{ ts: new Date().toISOString(), text }, ...prev].slice(0, 20))
    }
    client.on('message', messageHandler)

    return () => {
      client.off('connect', handleConnect)
      client.off('reconnect', handleReconnect)
      client.off('close', handleClose)
      client.off('error', handleError)
      client.off('message', messageHandler)
      try {
        client.unsubscribe(topic)
      } catch {}
    }
  }, [topic])

  const publish = () => {
    const client = getClient()
    if (!client || status !== 'connected' || !payload) return

    try {
      client.publish(topic, payload, (error) => {
        if (error) {
          console.error('Publish error:', error)
        }
      })
      setPayload('')
    } catch (error) {
      console.error('Failed to publish message:', error)
    }
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        MQTT Live Feed{' '}
        <CBadge color={statusColor} className="ms-2">
          {status}
        </CBadge>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-3">
          <CCol md={8}>
            <CFormInput
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="topic"
            />
          </CCol>
          <CCol md={4} className="text-end">
            <CBadge color="info">
              Broker: {import.meta.env.VITE_MQTT_URL || 'ws://localhost:8083/mqtt'}
            </CBadge>
          </CCol>
        </CRow>
        <CRow className="mb-3" xs={{ gutter: 2 }}>
          <CCol md={9}>
            <CFormInput
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              placeholder="message to publish"
            />
          </CCol>
          <CCol md={3}>
            <CButton
              color="primary"
              className="w-100"
              onClick={publish}
              disabled={status !== 'connected' || !payload}
            >
              Publish
            </CButton>
          </CCol>
        </CRow>
        <div
          style={{
            maxHeight: 260,
            overflowY: 'auto',
            fontFamily: 'monospace',
            fontSize: 12,
            border: '1px solid var(--cui-border-color)',
            borderRadius: 6,
            padding: 8,
          }}
        >
          {messages.length === 0 ? (
            <div className="text-body-secondary">
              No messages yet. Publish or send to this topic.
            </div>
          ) : (
            messages.map((m, i) => (
              <div key={i}>
                [{m.ts}] {m.text}
              </div>
            ))
          )}
        </div>
      </CCardBody>
    </CCard>
  )
}

export default MqttWidget
