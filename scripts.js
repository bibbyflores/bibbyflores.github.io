import { db, auth, provider, signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword } from './firebase-config.js';
import { collection, addDoc, query, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const loginGoogleBtn = document.getElementById('login-google');
const loginEmailBtn = document.getElementById('login-email');
const logoutBtn = document.getElementById('logout');
const postEditor = document.getElementById('post-editor');
const publishBtn = document.getElementById('publish-post');
const postFeed = document.getElementById('post-feed');

loginGoogleBtn.onclick = async () => {
  await signInWithPopup(auth, provider);
};

loginEmailBtn.onclick = async () => {
  const email = prompt("Enter your email:");
  const password = prompt("Enter your password:");
  if (email && password) {
    await signInWithEmailAndPassword(auth, email, password);
  }
};

logoutBtn.onclick = async () => {
  await signOut(auth);
};

onAuthStateChanged(auth, user => {
  const isLoggedIn = !!user;
  postEditor.style.display = isLoggedIn ? 'block' : 'none';
  logoutBtn.style.display = isLoggedIn ? 'inline-block' : 'none';
  loginGoogleBtn.style.display = isLoggedIn ? 'none' : 'inline-block';
  loginEmailBtn.style.display = isLoggedIn ? 'none' : 'inline-block';
});

publishBtn.onclick = async () => {
  const title = document.getElementById('post-title').value;
  const content = document.getElementById('post-content').value;
  const tags = document.getElementById('post-tags').value.split(',').map(t => t.trim());
  const image = document.getElementById('post-image').value;

  if (!title || !content) return alert("Title and content are required");

  await addDoc(collection(db, "posts"), {
    title, content, tags, image, date: new Date().toISOString()
  });

  alert("Post published!");
  location.reload();
};

async function loadPosts() {
  const q = query(collection(db, "posts"), orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  postFeed.innerHTML = "";

  snapshot.forEach(doc => {
    const post = doc.data();
    const html = \`
      <div class="post">
        <h3>\${post.title}</h3>
        \${post.image ? '<img src="' + post.image + '" alt="Image">' : ''}
        <p>\${post.content}</p>
        <small>Tags: \${(post.tags || []).join(", ")}</small>
        <hr>
      </div>
    \`;
    postFeed.innerHTML += html;
  });
}

loadPosts();
