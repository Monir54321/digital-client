import useAuth from "../utils/useAuth";
import { getUserFromToken } from "../utils/getUserData";

const UserInfo = () => {
  const { user, isAuthenticated, isTokenUser, isFirebaseUser } = useAuth();

  // Get user data directly from localStorage
  const localStorageData = getUserFromToken();

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">User Authentication Info</h2>

      <div className="space-y-3">
        <div className="p-3 bg-gray-50 rounded">
          <h3 className="font-semibold text-blue-600">Authentication Status</h3>
          <p>
            Is Authenticated:{" "}
            <span
              className={isAuthenticated ? "text-green-600" : "text-red-600"}
            >
              {isAuthenticated ? "Yes" : "No"}
            </span>
          </p>
          <p>
            Auth Type:{" "}
            {isFirebaseUser ? "Firebase" : isTokenUser ? "Token" : "None"}
          </p>
        </div>

        {isAuthenticated && (
          <div className="p-3 bg-green-50 rounded">
            <h3 className="font-semibold text-green-600">Current User Data</h3>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        )}

        {isTokenUser && (
          <div className="p-3 bg-blue-50 rounded">
            <h3 className="font-semibold text-blue-600">
              LocalStorage Token Data
            </h3>
            <p>
              Token: {localStorageData.token ? "✅ Present" : "❌ Not found"}
            </p>
            <p>User: {localStorageData.user ? "✅ Present" : "❌ Not found"}</p>
            {localStorageData.user && (
              <div className="mt-2">
                <h4 className="font-medium">User Details:</h4>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(localStorageData.user, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        <div className="p-3 bg-gray-50 rounded">
          <h3 className="font-semibold text-gray-600">How to Use</h3>
          <div className="text-sm space-y-2">
            <p>
              <strong>1. Get user from localStorage:</strong>
            </p>
            <code className="block bg-gray-100 p-2 rounded text-xs">
              {`import { getUserFromToken } from '../utils/getUserData';
const { token, user, isAuthenticated } = getUserFromToken();`}
            </code>

            <p>
              <strong>2. Use the unified auth hook:</strong>
            </p>
            <code className="block bg-gray-100 p-2 rounded text-xs">
              {`import useAuth from '../utils/useAuth';
const { user, isAuthenticated, isTokenUser, logout } = useAuth();`}
            </code>

            <p>
              <strong>3. Access user data:</strong>
            </p>
            <code className="block bg-gray-100 p-2 rounded text-xs">
              {`// User object contains all user information
console.log(user.email, user.name, user.role);`}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
