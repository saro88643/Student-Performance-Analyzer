import "./Login.css";

function Login() {
    return (
        <div className="login-page">

            <div className="left-section">

                <div className="overlay">

                    <h1>Student Performance Analyzer</h1>

                    <p>
                        AI Powered Student Intelligence System
                    </p>

                    <div className="features">

                        <div>📊 Student Analytics</div>

                        <div>📚 Attendance Monitoring</div>

                        <div>🏆 Certificate Tracking</div>

                        <div>🤖 Machine Learning Prediction</div>

                    </div>

                </div>

            </div>

            <div className="right-section">

                <div className="login-card">

                    <h2>Teacher Login</h2>

                    <input
                        type="email"
                        placeholder="Enter Email"
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                    />

                    <div className="remember">

                        <input type="checkbox"/>

                        Remember Me

                    </div>

                    <button>

                        Login

                    </button>

                    <span>

                        Forgot Password?

                    </span>

                </div>

            </div>

        </div>
    );
}

export default Login;