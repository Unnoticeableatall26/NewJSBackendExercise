git init
touch .gitignore
zim .gitignore
(.gitignore
node_modules
/node_modules
.env
package-lock.json
package.json
/db/
/middleware/
)
git add .
git commit -m "Initial Commit"
git remote add origin https://github.com/Unnoticeableatall26/NewJSBackendExercise.git

git push -u origin main
error: src refspec main does not match any
error: failed to push some refs to 'https://github.com/Unnoticeableatall26/NewJSBackendExercise.git'

git branch -M main
$ git push -u origin main
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Delta compression using up to 16 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (4/4), 336 bytes | 336.00 KiB/s, done.
Total 4 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
To https://github.com/Unnoticeableatall26/NewJSBackendExercise.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.




