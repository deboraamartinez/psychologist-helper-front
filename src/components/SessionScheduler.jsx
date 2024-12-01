import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { fetchSessions, createSession, fetchPatients } from '../services/api';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/SessionScheduler.css';
import { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';

registerLocale('pt-BR', ptBR);

const SessionScheduler = () => {
  const [sessions, setSessions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const sessionsResponse = await fetchSessions();
        setSessions(sessionsResponse.data);
      } catch (err) {
        setError('Erro ao carregar sessões. Verifique sua conexão ou login.');
      }

      try {
        const patientsResponse = await fetchPatients();
        setPatients(patientsResponse.data);
      } catch (err) {
        setError('Erro ao carregar pacientes.');
      }
    };
    loadData();
  }, []);

  const handleSchedule = async () => {
    if (!selectedDate || !time || !selectedPatient) {
      setError('Por favor, preencha todos os campos.');
      setSuccessMessage('');
      return;
    }

    const [hours, minutes] = time.split(':');
    const scheduledDateTime = new Date(selectedDate);
    scheduledDateTime.setHours(hours, minutes);

    try {
      await createSession({
        date: scheduledDateTime,
        patientId: selectedPatient,
      });
      setSuccessMessage('Sessão agendada com sucesso!');
      setError('');
      setTime('');
      setSelectedDate(null);
      setSelectedPatient('');
      const response = await fetchSessions();
      setSessions(response.data);
    } catch (err) {
      setError('Erro ao agendar sessão. Verifique os dados inseridos.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="scheduler-container">
      <h2 className="scheduler-title">Agendar Sessões</h2>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {/* Seleção de Paciente */}
      <div className="patient-picker">
        <label htmlFor="patient">Paciente:</label>
        <select
          id="patient"
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
          required
        >
          <option value="">Selecione um paciente</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.user.fullName}
            </option>
          ))}
        </select>
      </div>

      {/* Calendário */}
      <div className="calendar-container">
        <label htmlFor="date">Data:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date()}
          dateFormat="dd/MM/yyyy"
          placeholderText="Selecione uma data"
          locale="pt-BR"
          required
        />
      </div>

      {/* Seleção de Hora */}
      <div className="time-picker">
        <label htmlFor="time">Hora:</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>

      {/* Botão de Agendamento */}
      <button className="schedule-button" onClick={handleSchedule}>
        Confirmar agendamento
      </button>

      {/* Lista de Sessões Agendadas */}
      <h3 className="scheduled-title">Sessões Agendadas</h3>
      <ul className="scheduled-list">
        {sessions.map((session) => (
          <li key={session.id} className="scheduled-item">
            <AiOutlineCheckCircle className="icon" />
            <div>
              <strong>Paciente:</strong> {session.patient.user.fullName}
              <br />
              <strong>Data:</strong>{' '}
              {new Date(session.date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}{' '}
              às{' '}
              {new Date(session.date).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SessionScheduler;
