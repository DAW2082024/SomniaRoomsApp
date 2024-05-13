
function BackendConnectionStatus({ isLoading, isError }: { isLoading?: boolean, isError?: boolean }) {

  const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST;
  const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;

  return (
    <div>
      <p>
        Conected to Back-End at: {BACKEND_HOST} - {BACKEND_PORT}
      </p>
      <p>
        Conection Status: {isError ? "ERROR" : (isLoading ? "LOADING" : "LOADED")}
      </p>
    </div>
  )
}

export default BackendConnectionStatus
