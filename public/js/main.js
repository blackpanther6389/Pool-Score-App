'use-strict';

// Global Variables
var auth
var database
var storage

function main()
{
	// Create firebase objects
	auth = firebase.auth();

	let loginButton = document.getElementById('login');
	let logoutButton = document.getElementById('logout');

	loginButton.onclick = login;
	logoutButton.onclick = logout;

	auth.onAuthStateChanged(function(user)
	{
		if (user)
		{
			if (isValidEmail(user.email))
			{
				loginButton.setAttribute('hidden', 'true');
				logoutButton.removeAttribute('hidden');
				document.getElementById('loginPage').classList.add('hidden');
				document.getElementById('dashboardPage').classList.remove('hidden');
				console.log(userDoesExist(user.uid));
				addUserTest(user.uid, user.displayName);
			}
			else
			{
				alert('Not a valid email!');
				auth.signOut();
			}
		}
		else
		{
			loginButton.removeAttribute('hidden');
			logoutButton.setAttribute('hidden', 'true');
			document.getElementById('dashboardPage').classList.add('hidden');
			document.getElementById('loginPage').classList.remove('hidden');
		}
	});
}

function login()
{
	let provider = new firebase.auth.GoogleAuthProvider();
  	auth.signInWithPopup(provider);
}

function logout()
{
	auth.signOut();
}

function isValidEmail(email)
{
		validEmail = 'onefire.com';

		splitEmail = email.split('@');

		if (splitEmail[splitEmail.length - 1].toLowerCase() === validEmail)
		{
			return true;
		}
		else
		{
			return false;
		}
}

function userDoesExist(uid)
{
	let database = firebase.database();

	let userRef = database.ref('Users/' + uid);

	if(userRef == null)
	{
		return false;
	}
	else
	{
		return true;
	}
}

function addUserTest(uid, name)
{
	let database = firebase.database();

	let userRef = database.ref('Users/' + uid);

	let dataObject = {
		'name': name,
		'score': 0
	};

	userRef.set(dataObject, function(message){
		console.log('Complete');
	})
}
main()
