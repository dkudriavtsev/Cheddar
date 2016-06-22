PREFIX=./node_modules/.bin
## Compiler
# The compiler to use for the ES7 -> ES5 transformation
JC=$(PREFIX)/babel
# Location of files
SRC=src/
OUT=dist/
# The flags to pass to the compiler
JCFLAGS=$(SRC) -d $(OUT)
# The binary files to copy
BIN=cli/cheddar
EXE=cheddar
BIN_MAKE=$(foreach BIN_FILE,$(BIN),chmod 755 $(SRC)$(BIN_FILE) && cp $(SRC)$(BIN_FILE) $(OUT)$(BIN_FILE)${\n});\
		 ln -s $(OUT)cli/$(EXE) ./$(EXE)

## Tests
TESTRUNNER=$(PREFIX)/babel-node
COVERAGE=$(PREFIX)/babel-istanbul
TEST=$(PREFIX)/_mocha
TFLAGS=cover $(TEST)

## Rules
all: default

# The default task
# The **production** build
default: $(JC) $(SRC)
	$(JC) $(JCFLAGS) --minified
	$(BIN_MAKE)
# Development build task
# This builds and includes source maps
build: $(JC) $(SRC)
	$(JC) $(JCFLAGS) --sourceMaps="inline"
	$(BIN_MAKE)

# Runs install with default method
# Perhaps pass args later?
install: ./bin/install
	./bin/install --method=path

# Performs testing, including coverage
# At the moment uses mocha for testing
# and babel-istanbul for coverage
test: $(TESTRUNNER) $(COVERAGE) $(TEST)
	$(TESTRUNNER) $(COVERAGE) $(TFLAGS)
clean:
	rm -rf ./dist/
 .PHONY: test
