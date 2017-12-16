@echo off

set curDir=%~dp0
set pyexe=%curDir%..\..\data\client\tool\Python27\python.exe
set pyscript=%curDir%create_thm.py

echo 正在生成皮肤
%pyexe% %pyscript%
echo 生成完毕

