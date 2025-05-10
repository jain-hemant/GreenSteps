import { setComponentDisplayName } from '##/src/utility/utility.js';
import ActionLogger from '../Components/actionLogger/CreateAndEdit';
import Api from '##/src/request';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectMe } from '../store/slices/userSlice';
import ActionLogList from '../Components/actionLogger/ActionLogList';
import { selectToggleState } from '../store/slices/applicationSlice';

function ActionLogManager() {
  const [globalHabits, setGlobalHabits] = useState([]);
  const [customHabits, setCustomHabits] = useState([]);
  const [logs, setLogs] = useState([]);
  const user = useSelector(selectMe);
  const userId = user._id;
  const isToogleEnabled = useSelector(selectToggleState);
  useEffect(() => {
    const fetchLogs = async () => {
      const response = await Api.fetch(`/api/user-log/user/${userId}`);
      setLogs(response);
    };
    fetchLogs();
  }, [userId]);

  async function fetchHabits() {
    const [gRes, cRes] = await Promise.all([
      Api.fetch('/api/habit/global'),
      Api.fetch(`/api/habit/custom/${user?._id}`),
    ]);
    setGlobalHabits(gRes);
    setCustomHabits(cRes);
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleLogSubmit = async (data) => {
    const newLog = await Api.fetch(`/api/log/${userId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    setLogs([...logs, newLog]); // Update UI
  };

  const handleDelete = async (logId) => {
    if (!confirm('Delete this habit?')) return;
    await Api.fetch(`/api/log/${userId}/${logId}`, {
      method: 'DELETE',
    });
    setLogs(logs.filter((log) => log._id !== logId));
  };

  return (
    <div
      className={`${isToogleEnabled ? 'ml-63  w-[78vw]' : 'ml-20  w-[80vw]'} overflow-x-hidden transition-all duration-500 p-6 min-h-screen`}
    >
      <ActionLogger
        onSubmit={handleLogSubmit}
        habits={[...globalHabits, ...customHabits]}
      />
      <br />
      <ActionLogList logs={logs} onDelete={handleDelete} />
    </div>
  );
}

setComponentDisplayName(ActionLogManager, 'ActionLogManager');
export default ActionLogManager;
