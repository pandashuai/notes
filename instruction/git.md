# 本地创建存储库
$ git init

# 提交到暂存区
$ git add <文件>  注： git add xx命令可以将xx文件添加到暂存区，如果有很多改动可以通过 git add -A .来一次添加所有改变的文件。
注意 -A 选项后面还有一个句点。 git add -A表示添加所有内容， git add . 表示添加新文件和编辑过的文件不包括删除的文件; git add -u 表示添加编辑或者删除的文件，不包括新添加的文件。

# 暂存区文件提交
$ git commit -m "注释"   注： （-m 的参数是注释）


# 查看修改状态
$ git status

# 设置（没有设置就提交的情况会出现）
$ git config --global user.email "you@example.com"
$ git config --global user.name "Your Name"

# 查看文件内容变动
$ git diff <文件>

# 查看当前日志
$ git log --graph --pretty=oneline --abbrev-commit  注： (参数可选）

# 查看历史记录
$ git reflog

# 回滚上一次的版本
$ git reset --hard HEAD^

# 回滚到指定的版本
$ git reset --hard <版本号>

# 清除当前工作区的文件数据
$ git checkout -- <文件>

# 删除文件(也是修改的一种）
$ git rm <文件>

# 将自己的本地存储库 和 远程已存在的空存储 建立关系（存储库保持一致？？没有测试，不知）
$ git remote add <定义库名> <远程本地存储库地址>


# 将本地已提交的的文件 推送到 远程库（push 需当前主机存有 ssh-key, 否则失败）
$ git push -u <库名> <分支>  注： -u 参数 是第一次推送 才使用，之后不用，默认的主分支是： master，默认库名是： origin

# 从远程库 克隆到 本地
$ git clone <远程本地存储库地址>

# 创建分支
$ git branch <分支名>

# 切换分支
$ git checkout <分支名>

# 创建 并 切换分支
$ git checkout -b <分支名>

# 查看分支列表
$ git branch

# 合并某分支到当前分支
$ git merge <某分支名>
$ git merge --no-ff -m "注释" <某分支名>   注： 方便团队合作，推荐

# 删除分支
$ git branch -d <分支名> 注：-d 变 -D 就是强行删除

# 生成key(尽量不要改变key的默认位置及名字, 找到id_rsa.pub（公钥）文件复制里面的内容放在github - settings - key 上）
$ ssh-keygen -t rsa -C "you@example.com" 

# 把当前工作现场“储藏”起来，等以后恢复现场后继续工作
$ git stash

# 当前工作现场“储藏”列表
$ git stash list

# 把“储藏”取出来
$ git stash apply  注： 但是恢复后，stash内容并不删除
$ git stash pop 注： 恢复的同时把stash内容也删了

# 在当前分支上新建一个标签
$ git tag <标签名>
$ git tag -a <标签名> -m "注释"  注： 可以指定标签信息
$ git tag -s <标签名> -m "注释"  注： 可以用PGP签名标签

# 在指定的提交版本号新建一个标签
$ git tag <标签名> <版本号>

# 查看所有标签。
$ git tag

# 标签删除
$ git tag -d <标签名>

# 要推送某个标签到远程
$ git push <库名> <标签名>