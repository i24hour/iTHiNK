// Import Supabase
const SUPABASE_URL = "https://adhvqahxlurrobhrawei.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkaHZxYWh4bHVycm9iaHJhd2VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0NzE0MDUsImV4cCI6MjA1NjA0NzQwNX0.WCLh0Z6Imq4IZ-2ssdypo32QixbM5v378Z-oJXKBLAQ";

// Fix Supabase initialization using the correct global object
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 🚀 Sign-Up Function
async function handleSignUp(event) {
    event.preventDefault();
    console.log("Sign-up function called");

    try {
        const fullName = document.getElementById("fullName")?.value;
        const email = document.getElementById("email")?.value;
        const password = document.getElementById("password")?.value;
        const confirmPassword = document.getElementById("confirmPassword")?.value;

        console.log("Form values:", { fullName, email, password, confirmPassword }); // Debug log

        if (!email || !password) {
            alert("❌ Please fill in all required fields!");
            return;
        }

        if (password !== confirmPassword) {
            alert("❌ Passwords do not match!");
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: fullName
                }
            }
        });

        if (error) {
            console.error("Sign-up failed:", error.message);
            alert("❌ Sign-up failed: " + error.message);
            return;
        }

        if (data?.user) {
            alert("✅ Sign-up successful! Please check your email to verify your account.");
            window.location.href = "index.html";
        }

    } catch (err) {
        console.error("Error during sign-up:", err);
        alert("❌ An error occurred during sign-up: " + err.message);
    }
}

// 🚀 Sign-In Function
async function handleSignIn(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        console.error("Login failed:", error.message);
        alert("❌ Login failed: " + error.message);
        return;
    }

    alert("✅ Sign-in successful!");
    window.location.href = "index.html"; // Redirect to home page
}

// 🚀 Get User Details
async function getUserDetails() {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        console.error("Error fetching user:", error.message);
        return;
    }

    const userId = data.user?.id; // Ensure user data exists
    if (!userId) {
        console.error("User not found.");
        return;
    }

    const { data: userData, error: dbError } = await supabase
        .from("users")
        .select("phone, full_name")
        .eq("id", userId)
        .single();

    if (dbError) {
        console.error("Error fetching user data:", dbError.message);
    } else {
        console.log("User Data:", userData);
    }
}

// 🚀 Password Reset
async function handleResetPassword(event) {
    event.preventDefault();

    const email = document.getElementById("resetEmail").value;

    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
        console.error("Error:", error.message);
        alert("❌ Password reset failed: " + error.message);
    } else {
        alert("✅ Password reset link sent to your email.");
    }
}

// Wait for DOM to be fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignUp);
        console.log("Sign-up form listener added"); // Debug log
    } else {
        console.log("Sign-up form not found"); // Debug log
    }

    // Add signin form listener
    const signinForm = document.getElementById('signin-form');
    if (signinForm) {
        signinForm.addEventListener('submit', handleSignIn);
        console.log("Sign-in form listener added");
    }
});
